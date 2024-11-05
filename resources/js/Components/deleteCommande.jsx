import { Modal, Input, Form, message } from "antd";
import { useEffect, useState } from "react";



export default function DeleteCommande ({cancel, confirm, isOpen, update, commande}){

    const [messageAPI, contextHolder] = message.useMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://127.0.0.1:8000/api/commande'; 
            
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ID_Commande: commande?.ID_Commande,
                })
            };
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                //toast.success('Étudiant ajouté avec succès');
                messageAPI.success('Commande effacé avec succès')
            } else {
                messageAPI.error('Une erreur s\'est produite lors de la suppression');
            }
        } catch (error) {
            console.error('Erreur lors de la requête API :', error);
            messageAPI.error('Une erreur s\'est produite lors de la suppression');
        }
        finally{
            confirm();
            update();
        }
    };

    return(<>
        {contextHolder}
        <Modal title="Effacer produit" okText='Effacer' onCancel={cancel} onOk={handleSubmit} open={isOpen}>
            <p>Êtes-vous sûr(e) de vouloir effacer cette commande?</p>
        </Modal>
        </>
    )
}