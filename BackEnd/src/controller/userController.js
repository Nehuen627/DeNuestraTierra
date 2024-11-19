import userService from "../services/userService.js";
import bcrypt from 'bcrypt';
import { Exception } from "../utils/utils.js";
import cartController from "./cartController.js";

export default class {
    static async findEmail(email){
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return null;
        } else {
            return user;
        }
    }
    static async findById(id){
        return await userService.getUserById(id);
    
    }
    static async getUserData(email, password){
        const user = await this.findEmail(email)
        if (!user) {
            return "Email or password invalid";
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            return user;
        } else {
            return "Email or password invalid";
        }
    }
    static async addUser(data){
        try {
            const saltRounds = 10;   
            data.password = await bcrypt.hash(data.password, saltRounds);            
            const user  = await userService.create(data);
            const userFinal = await this.findEmail(data.email);
            
            return userFinal
        }
        catch (error) {
            new Exception(error, 500 )
        }
    }

    static async updateData(dataToUpdate, data, id){
        try {
            let user = await userService.getUserById(id);
    
            if (dataToUpdate === "email") {    
                let email = data
                const existingUser = await userService.getUserByEmail(email);
    
                if (existingUser && existingUser.id.toString() !== id) {
                    throw new Exception("The email cannot be used");
                }
                
                user.email = data;
                if(user.cart === undefined){
                    const userCart = await cartController.addCart(data)
                    user.cart = userCart
                }

                const updatedUser = await userService.updateUserById(id, user);
                const newUser = await userService.getUserByEmail(email)    
                return newUser;
            } else if (dataToUpdate === "password") {
                const passwordMatch = await bcrypt.compare(data, user.password);
                if(passwordMatch){
                    return false
                } else {
                    const saltRounds = 10;
                    data = await bcrypt.hash(data, saltRounds);
                    user.password = data;
                    
                    const updatedUser = await userService.updateUserById(id, user);
                    return true;
                }
            }
        } catch (error) {
            console.error("Error updating data:", error);
            throw error; 
        }
    }

    static async changeRol(req, res){
        const { id } = req.params;
        const { newRole } = req.body; 

        try {
            let user = await userService.getUserById(id);
            if (!user) return res.status(404).json({ message: "user not found" });

            user.role = newRole

            const updatedUser = await userService.updateUserById(id, user);
            res.json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating stock', error });
        }
    }

    static async deleteUserById(req, res){
        try {
            const { id } = req.params;
            
            await userService.deleteUserById(id);
            res.status(200).json({ message: 'user deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await userService.getUsers()
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Error fetching products', error });
        }
    }
}