import produit from "@/Pages/produit";
import { Modal, Input, Form, message, Select } from "antd";
import { useEffect, useState } from "react";

export default function CreateCommande ({cancel, confirm, isOpen, update}){

    const [messageAPI, contextHolder] = message.useMessage();

    //Informations
    const  [produit, setProduit] = useState([])
    const  [fournisseur, setFournisseur] = useState([])
    const [max, setMax] = useState('');

    const  [selectedProduit, setSelectedProduit] = useState('')
    const  [selectedFournisseur, setSelectedFournisseur] = useState('')
    const  [prix, setPrix] = useState('')
    const  [quantite, setQuantite] = useState('')
    const  [date, setDate] = useState('');
    const  [isInvalid, setIsInvalid] = useState (true);

    useEffect(()=>{
        if (selectedProduit === "" ||  selectedFournisseur === "" || prix === "" || quantite === "" || date === "")
            setIsInvalid(true)
        else
            setIsInvalid(false)
    }, [selectedFournisseur, selectedProduit, prix, quantite, date])

    useEffect(()=>{
        const x = produit.filter(objet => objet.ID_Produit === selectedProduit);
        setMax(x[0]?.Qte_En_Stock);

        setPrix (quantite * x[0]?.Prix_Unitaire)

    }, [selectedProduit, quantite])


    const getProducts = async () => {
        try {
            const url = `http://localhost:8000/api/produit`; 
            
            const response = await fetch(url);

            const produits = await response.json();
            
            setProduit(produits)

            console.log(produit)
            
        } catch (error) {
            console.error('Erreur lors de la requête API :', error);
        }
    }

    const getFournisseurs= async () => {
        try {
            const url = 'http://localhost:8000/api/fournisseur?name='; 
            
            const response = await fetch(url);

            const fournisseurs = await response.json();
            
            setFournisseur(fournisseurs)
            
        } catch (error) {
            console.error('Erreur lors de la requête API :', error);
        }
    }

    useEffect(()=>{
        getProducts();
        getFournisseurs();
    },[isOpen])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(date);
        if (isInvalid) {
            messageAPI.error('Veuillez remplir tous les champs');
        } else {
            try {
                const url = 'http://127.0.0.1:8000/api/commande'; 
                
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        Date_Commande: date,
                        Qte_Commande: quantite,
                        Prix_Total: prix,
                        ID_Produit: selectedProduit,
                        ID_Fournisseur: selectedFournisseur,
                    })
                };
                const response = await fetch(url, requestOptions);
                if (response.ok) {
                    //toast.success('Étudiant ajouté avec succès');
                    messageAPI.success('Commande ajouté avec succès')
                    // Réinitialisez les valeurs après l'ajout réussi si nécessaire
                    setDate('');
                    setSelectedFournisseur('');
                    setPrix('');
                    setQuantite('');
                    setMax('');
                    setSelectedProduit('');
                } else {
                    messageAPI.error('Une erreur s\'est produite lors de l\'ajout');
                }
            } catch (error) {
                console.error('Erreur lors de la requête API :', error);
                messageAPI.error('Une erreur s\'est produite lors de l\'ajout');
            }
            finally{
                confirm();
                update();
            }
        }
    };

    return(<>
        {contextHolder}
        <Modal title="Nouvelle commande" okText='Ajouter' onCancel={cancel} onOk={handleSubmit} open={isOpen}>
            <Form layout="vertical" >
                <Form.Item label='Produit' required >
                    <Select 
                        options={produit.map(produit => ({value: produit.ID_Produit, label: produit.Nom_Produit}))}
                        placeholder="Choisissez un produit"
                        onChange={(e)=>{setSelectedProduit(e)}}
                    />
                </Form.Item>
                <Form.Item label='Fournisseur' required >
                    <Select 
                        options={fournisseur.map(fournisseur => ({value: fournisseur.ID_Fournisseur, label: fournisseur.Nom_Fournisseur}))}
                        placeholder="Choisissez un fournisseur"
                        onChange={(e)=>{setSelectedFournisseur(e)}}
                    />
                </Form.Item>
                <Form.Item label='Quantité' required  extra={"Quantité maximal: " + (max || "Veuillez choisir un produit")}>
                    <Input value={quantite} onChange={(e)=>{setQuantite(e.target.value)}} type="number" min={0} max={max}></Input>
                </Form.Item>
                <Form.Item label='Montant total' required extra="Le montant total est calculé automatiquement">
                    <Input disabled value={prix} onChange={(e)=>{setPrix(e.target.value)}} type="number"></Input>
                </Form.Item>
                <Form.Item label='Date' required>
                    <Input type="date" value={date} onChange={(e)=>{setDate(e.target.value)}}></Input>
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
}