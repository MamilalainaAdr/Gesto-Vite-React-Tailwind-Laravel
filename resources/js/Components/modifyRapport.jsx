import produit from "@/Pages/produit";
import { Modal, Input, Form, message, Select } from "antd";
import { useEffect, useState } from "react";

export default function ModifRapport ({cancel, confirm, isOpen, update, rapport}){

    const [messageAPI, contextHolder] = message.useMessage();

    //Informations
    const  [commande, setCommande] = useState([])

    const  [selectedCommande, setSelectedCommande] = useState('')
    const  [date, setDate] = useState('');
    const  [note, setNote] = useState ('');

    const  [isInvalid, setIsInvalid] = useState (true);

    useEffect(()=>{
        setDate(rapport?.Date_Rapport);
        setNote(rapport?.Note);
        setSelectedCommande(rapport?.ID_Commande);
    }, [rapport])

    useEffect(()=>{
        if (selectedCommande === "" ||  note === "" ||  date === "")
            setIsInvalid(true)
        else
            setIsInvalid(false)
    }, [note, date, selectedCommande])


    const getCommandes = async () => {
        try {
            const url = `http://localhost:8000/api/commande`; 
            
            const response = await fetch(url);

            const produits = await response.json();
            
            setCommande(produits)
            
        } catch (error) {
            console.error('Erreur lors de la requête API :', error);
        }
    }


    useEffect(()=>{
        getCommandes();
    },[isOpen])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isInvalid) {
            messageAPI.error('Veuillez remplir tous les champs');
        } else {
            try {
                const url = 'http://127.0.0.1:8000/api/rapport'; 
                
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: rapport?.ID_Rapport,
                        Date_Rapport: date,
                        Status: 'En cours',
                        Note: note,
                        ID_Commande: selectedCommande
                    })
                };
                const response = await fetch(url, requestOptions);
                if (response.ok) {
                    //toast.success('Étudiant ajouté avec succès');
                    messageAPI.success('Rapport modifié avec succès')
                    // Réinitialisez les valeurs après l'ajout réussi si nécessaire
                    setDate('');
                    setSelectedCommande('');
                    setNote('')
                }
            } catch (error) {
                messageAPI.error('Une erreur s\'est produite lors de la modification');
                console.error('Erreur lors de la requête API :', error);
            }
            finally{
                confirm();
                update();
            }
        }
    };

    return(<>
        {contextHolder}
        <Modal title="Nouvelle rapport" okText='Ajouter' onCancel={cancel} onOk={handleSubmit} open={isOpen}>
            <Form layout="vertical" >
                <Form.Item label='ID Produit' required >
                    <Select 
                        value={selectedCommande}
                        options={commande.map(commande => ({value: commande.ID_Commande, label: commande.ID_Commande}))}
                        placeholder="Choisissez une commande"
                        onChange={(e)=>{setSelectedCommande(e)}}
                    />
                </Form.Item>
                <Form.Item label='Note' required >
                    <Input.TextArea placeholder="Laissez une note" value={note} onChange={(e)=>{setNote(e.target.value)}}></Input.TextArea>
                </Form.Item>
                <Form.Item label='Date du rapport' required>
                    <Input type="date" value={date} onChange={(e)=>{setDate(e.target.value)}}></Input>
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
}