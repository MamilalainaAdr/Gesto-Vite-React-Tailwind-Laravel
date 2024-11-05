import produit from "@/Pages/produit";
import { Modal, Input, Form, message, Select } from "antd";
import { useEffect, useState } from "react";

export default function Terminate ({cancel, isOpen, update, commande}){

    const [messageAPI, contextHolder] = message.useMessage();

    //Informations
    const  [commandes, setcommandes] = useState([])

    const  [selectedcommandes, setSelectedcommandes] = useState('')
    const  [date, setDate] = useState('');
    const  [note, setNote] = useState ('');

    const  [isInvalid, setIsInvalid] = useState (true);

    useEffect(()=>{
        if (selectedcommandes === "" ||  note === "" ||  date === "")
            setIsInvalid(true)
        else
            setIsInvalid(false)
    }, [note, date, selectedcommandes])


    const getCommandes = async () => {
        try {
            const url = `http://localhost:8000/api/commande`; 
            
            const response = await fetch(url);

            const produits = await response.json();
            
            setcommandes(produits)
            
        } catch (error) {
            console.error('Erreur lors de la requête API :', error);
        }
    }


    useEffect(()=>{
        getCommandes();
        setSelectedcommandes(commande?.ID_Commande)
    },[isOpen])


    const terminer = async (id) =>{
        console.log(id)
        try {
            const url = 'http://127.0.0.1:8000/api/commande/terminer'; 
            
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ID_Commande: id,
                    status: "Terminée"
                })
            };
            const response = await fetch(url, requestOptions);
            
            //await handleSubmit();

            if (response.ok) {
                //toast.success('Étudiant ajouté avec succès');
                messageAPI.success('La commande a été effectuée')
            }
        } catch (error) {
            messageAPI.error('Une erreur s\'est produite');
            console.error('Erreur lors de la requête API :', error);
        }
        update();
        cancel();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(date);
        if (isInvalid) {
            messageAPI.error('Veuillez remplir tous les champs');
        } else {
            try {
                const url = 'http://127.0.0.1:8000/api/rapport'; 
                
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        Date_Rapport: date,
                        Note: note,
                        ID_Commande: selectedcommandes
                    })
                };
                const response = await fetch(url, requestOptions);
                if (response.ok) {
                    setDate('');
                    setSelectedcommandes('');
                    setNote('')
                }
            } catch (error) {
                return console.error('Erreur lors de la requête API :', error);
            }
            try {
                const url = 'http://127.0.0.1:8000/api/commande/terminer'; 
                
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ID_Commande: commande?.ID_Commande,
                        status: "Terminée"
                    })
                };
                const response = await fetch(url, requestOptions);
                
                //await handleSubmit();
    
                if (response.ok) {
                    //toast.success('Étudiant ajouté avec succès');
                    messageAPI.success('La commande a été effectuée')
                }
            } catch (error) {
                messageAPI.error('Une erreur s\'est produite');
                console.error('Erreur lors de la requête API :', error);
            }
            update();
            cancel();
        }
        
    };

    return(<>
        {contextHolder}
        <Modal title="Rapport pour terminer la commande" okText='Ajouter' onCancel={cancel} onOk={handleSubmit} open={isOpen}>
            <Form layout="vertical" >
                <Form.Item label='ID Commande' required >
                    <Select 
                        options={commandes.map(commande => ({value: commande.ID_Commande, label: commande.ID_Commande}))}
                        placeholder="Choisissez une commande"
                        onChange={(e)=>{setSelectedcommandes(e)}}
                        value={selectedcommandes}
                        disabled
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