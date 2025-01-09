import React from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1>Política de Privacidad</h1>
        
        <section>
          <h2>1. Introducción</h2>
          <p>En <strong>DeNuestraTierra</strong>, nos comprometemos a proteger la privacidad de nuestros usuarios. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos la información que compartes con nosotros. Al usar este sitio web, aceptas los términos descritos a continuación.</p>
        </section>

        <section>
          <h2>2. Información que recopilamos</h2>
          <ul>
            <li>Datos personales: Nombre, correo electrónico, y cualquier otra información que proporciones al rellenar formularios de contacto.</li>
            <li>Datos técnicos: Dirección IP, tipo de navegador, tiempo de visita y páginas visitadas.</li>
            <li>Cookies: Información recopilada mediante cookies para mejorar la experiencia del usuario.</li>
          </ul>
        </section>

        <section>
          <h2>3. Cómo usamos tu información</h2>
          <ul>
            <li>Para responder a tus consultas o solicitudes.</li>
            <li>Para mejorar nuestro sitio web y personalizar la experiencia del usuario.</li>
            <li>Para cumplir con requisitos legales o normativos.</li>
          </ul>
        </section>

        <section>
          <h2>4. Compartir información con terceros</h2>
          <p>No compartimos tu información personal con terceros, excepto cuando sea necesario para:</p>
          <ul>
            <li>Proveer servicios solicitados (por ejemplo, plataformas de correo).</li>
            <li>Cumplir con obligaciones legales.</li>
            <li>Proteger nuestros derechos legales o prevenir fraudes.</li>
          </ul>
        </section>

        <section>
          <h2>5. Uso de cookies</h2>
          <ul>
            <li>Analizar el tráfico del sitio web.</li>
            <li>Recordar tus preferencias. Puedes desactivar las cookies en la configuración de tu navegador, aunque esto puede afectar tu experiencia en el sitio.</li>
          </ul>
        </section>

        <section>
          <h2>6. Seguridad de la información</h2>
          <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos contra accesos no autorizados, pérdida o alteración. Sin embargo, ningún sistema es completamente seguro, y no podemos garantizar la seguridad absoluta de la información.</p>
        </section>

        <section>
          <h2>7. Derechos de los usuarios</h2>
          <ul>
            <li>Acceder a los datos personales que hemos recopilado.</li>
            <li>Solicitar la corrección o eliminación de datos.</li>
            <li>Retirar el consentimiento para el uso de datos.</li>
          </ul>
          <p>Para ejercer estos derechos, puedes contactarnos mediante el <strong>formulario</strong> de <Link to="/contact">Contacto</Link>.</p>
        </section>

        <section>
          <h2>8. Cambios en la política de privacidad</h2>
          <p>Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Cualquier cambio será publicado en esta página con la fecha de actualización.</p>
        </section>

        <section>
          <h2>9. Contacto</h2>
          <p>Si tienes preguntas sobre esta Política de Privacidad, puedes contactarnos mediante el <strong>formulario</strong> de <Link to="/contact">Contacto</Link>.</p>
        </section>

        <section>
          <h2>10. Fecha de vigencia</h2>
          <p>Esta Política de Privacidad entra en vigencia a partir del 09/01/2025.</p>
          <p>Esta Política de Privacidad fue actualizada el día: 09/01/2024</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;