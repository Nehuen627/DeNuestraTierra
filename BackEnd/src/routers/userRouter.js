import { Router } from 'express';
import userController from '../controller/userController.js';
import userService from '../services/userService.js';
import { authenticateLevel } from '../utils/utils.js';
const router = Router();

router.get('/users', userController.getUsers)
router.patch('/users/changeRol/:id',authenticateLevel(4), userController.changeRol)
router.delete('/users/delete/:id', userController.deleteUserById)
router.patch('/users/update/:id', userController.updateUserInfo);

router.patch('/users/update-password/:id', userController.updateUserPassword);
router.get('/user/regions', (req, res) => {
    const regions = [
        { id: 1, Name: "Buenos Aires" },
        { id: 2, Name: "Catamarca" },
        { id: 3, Name: "Chaco" },
        { id: 4, Name: "Chubut" },
        { id: 5, Name: "Córdoba" },
        { id: 6, Name: "Corrientes" },
        { id: 7, Name: "Entre Ríos" },
        { id: 8, Name: "Formosa" },
        { id: 9, Name: "Jujuy" },
        { id: 10, Name: "La Pampa" },
        { id: 11, Name: "La Rioja" },
        { id: 12, Name: "Mendoza" },
        { id: 13, Name: "Misiones" },
        { id: 14, Name: "Neuquén" },
        { id: 15, Name: "Río Negro" },
        { id: 16, Name: "Salta" },
        { id: 17, Name: "San Juan" },
        { id: 18, Name: "San Luis" },
        { id: 19, Name: "Santa Cruz" },
        { id: 20, Name: "Santa Fe" },
        { id: 21, Name: "Santiago del Estero" },
        { id: 22, Name: "Tierra del Fuego" },
        { id: 23, Name: "Tucumán" }
    ]
    
    
    res.json(regions);
})

router.get("/users/demo/addUser",authenticateLevel(4), async (req, res) => {
    try {
        const data = req.body
        const user = await userController.addUser(data)
        
        res.json(user)
    } 
    catch (error){
        console.log(error);
        
    }
})
router.get("/users/demo/email",authenticateLevel(4), async (req, res) => {
    try {
        const { email } = req.body
    
        const user = await userController.findEmail(email)
        
        res.json(user)
    } 
    catch (error){
        console.log(error);
        
    }
})
export default router;