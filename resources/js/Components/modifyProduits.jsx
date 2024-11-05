import { Modal, Input, Form, message } from "antd";
import { useEffect, useState } from "react";



export default function ModifyProduct ({cancel, confirm, isOpen, update, product}){

    const [messageAPI, contextHolder] = message.useMessage();

    //Informations
    const  [nom, setNom] = useState('')
    const  [description, setDescription] = useState('')
    const  [prix, setPrix] = useState('')
    const  [quantite, setQuantite] = useState('')
    const  [isInvalid, setIsInvalid] = useState (true);

    useEffect(()=>{
        if (nom === "" ||  prix === "" || description === "" || quantite === "")
            setIsInvalid(true)
        else
            setIsInvalid(false)
    }, [nom, description, prix, quantite])


    useEffect(()=>{
        setNom(product?.Nom_Produit)
        setDescription(product?.Description)
        setPrix(product?.Prix_Unitaire)
        setQuantite(product?.Qte_En_Stock)
    }, [isOpen])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isInvalid) {
            messageAPI.error('Veuillez remplir tous les champs');
        } else {
            try {
                const url = 'http://127.0.0.1:8000/api/produit'; 
                
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ID_Produit: product?.ID_Produit,
                        Nom_Produit: nom,
                        Description: description,
                        Prix_Unitaire: prix,
                        Qte_En_Stock: quantite,
                    })
                };
                const response = await fetch(url, requestOptions);
                if (response.ok) {
                    //toast.success('Étudiant ajouté avec succès');
                    messageAPI.success('Produit modifié avec succès')
                    // Réinitialisez les valeurs après l'ajout réussi si nécessaire
                    setDescription('');
                    setNom('');
                    setPrix('');
                    setQuantite('');
                } else {
                    messageAPI.error('Une erreur s\'est produite lors de la modification');
                }
            } catch (error) {
                console.error('Erreur lors de la requête API :', error);
                messageAPI.error('Une erreur s\'est produite lors de la modification');
            }
            finally{
                confirm();
                update();
            }
        }
    };

    return(<>
        {contextHolder}
        <Modal title="Modifier produit" okText='Modifier' onCancel={cancel} onOk={handleSubmit} open={isOpen}>
            <Form layout="vertical" >
                <Form.Item label='Nom' required >
                    <Input onChange={(e)=>{setNom(e.target.value)}} value={nom} placeholder="Nom complet" />
                </Form.Item>
                <Form.Item label="Description" required>
                    <Input.TextArea onChange={(e)=>{setDescription(e.target.value)}} value={description}  placeholder="Description"/>
                </Form.Item>
                <Form.Item label= "Prix unitaire" required>
                    <Input onChange={(e)=>{setPrix(e.target.value)}} value={prix}  type="number" />
                </Form.Item>
                <Form.Item label= "Quantité" required>
                    <Input onChange={(e)=>{setQuantite(e.target.value)}} value={quantite}  type="number" />
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
}