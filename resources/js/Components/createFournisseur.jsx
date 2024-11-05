import { Modal, Input, Form, message } from "antd";
import { useEffect, useState } from "react";



export default function CreateFournisseur ({cancel, confirm, isOpen, update}){

    const [messageAPI, contextHolder] = message.useMessage();

    //Informations
    const  [nom, setNom] = useState('')
    const  [email, setEmail] = useState('')
    const  [adresse, setAdresse] = useState('')
    const  [telephone, setTelephone] = useState('')

    const  [isInvalid, setIsInvalid] = useState (true);

    useEffect(()=>{
        if (nom === "" ||  email === "" || adresse === "" || telephone === "")
            setIsInvalid(true)
        else
            setIsInvalid(false)
    }, [nom, email, adresse, telephone])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isInvalid) {
            messageAPI.error('Veuillez remplir tous les champs');
        } else {
            try {
                const url = 'http://127.0.0.1:8000/api/fournisseur'; 
                
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        Nom_Fournisseur: nom,
                        Email: email,
                        Adresse: adresse,
                        Telephone: telephone,
                    })
                };
                const response = await fetch(url, requestOptions);
                if (response.ok) {
                    //toast.success('Étudiant ajouté avec succès');
                    // Réinitialisez les valeurs après l'ajout réussi si nécessaire
                    setAdresse('');
                    setNom('');
                    setEmail('');
                    setTelephone('');
                    messageAPI.success('Fournisseur ajouté avec succès')
                } else {
                    messageAPI.error('Une erreur s\'est produite lors de l\'ajout du fournisseur');
                }
            } catch (error) {
                console.error('Erreur lors de la requête API :', error);
                messageAPI.error('Une erreur s\'est produite lors de l\'ajout du fournisseur');
            }
            finally{
                confirm();
                update();
            }
        }
    };

    return(
        <>
        {contextHolder}
        <Modal title="Nouveau fournisseur" okText='Ajouter' onCancel={cancel} onOk={handleSubmit} open={isOpen}>
            <Form layout="vertical" >
                <Form.Item label='Nom' required >
                    <Input value={nom} onChange={(e)=>{setNom(e.target.value)}} placeholder="Nom"/>
                </Form.Item>
                <Form.Item label="Adresse email" required>
                    <Input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Adresse email" />
                </Form.Item>
                <Form.Item label= "Adresse" required>
                    <Input value={adresse} onChange={(e)=>{setAdresse(e.target.value)}} placeholder="Adresse de résidence"/>
                </Form.Item>
                <Form.Item label= "Téléphone" required>
                    <Input value={telephone} onChange={(e)=>{setTelephone(e.target.value)}} />
                </Form.Item>
            </Form>
            
        </Modal>
        </>
    )
}