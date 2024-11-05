import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Layout, Button, Input, Card, Badge, message} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import CreateCommande from "@/Components/createCommande";
import ModifCommande from "@/Components/ModifCommande";
import { Zoom as Reveal } from "react-awesome-reveal";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import DeleteCommande from "@/Components/deleteCommande";
import Terminate from "@/Components/terminate";


const {Content, Header} = Layout

export default function commande({ auth }) {

    const [messageAPI, contextHolder] = message.useMessage();

    const [isAddOpen, setIsAddOpen] = useState (false);
    const [isModifOpen, setIsModifOpen] = useState (false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isTerminateOpen, setIsTerminateOpen] = useState(false);

    const [commande, setCommande] = useState ([]);
    const [activeCommande, setActiveCommande] = useState(null)

    useEffect(()=>{
        console.log(activeCommande);
    }, [activeCommande])

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
        getCommandes()
    }, [])

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Commande</h2>}
    >
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
            <Button onClick={()=>{setIsAddOpen(!isAddOpen)}} icon={<PlusOutlined />} type="primary">Ajouter</Button>
        </div>
        {contextHolder}
        <Content>
            {Array.isArray(commande) && <Reveal duration={200} cascade triggerOnce>
                <ul style={{
                listStyle: 'none',

            }}>
                {commande.map((commande, index)=>(
                    <li className="dataList" key={index} style={{marginBottom: '1rem'}}>
                        <Badge.Ribbon text={commande.Status} color={commande.Status === "Terminée"? "green": "yellow"}>
                            <Card actions={[
                                <Button
                                color="green"
                                onClick={()=>{
                                    setActiveCommande(commande)
                                    setIsTerminateOpen(true)
                                }}
                                icon={<CheckOutlined />}
                                />,
                                <Button onClick={()=>{
                                    setActiveCommande(commande)
                                    setIsModifOpen(!isModifOpen)
                                }} icon={<EditOutlined />} />,
                                <Button onClick={()=>{
                                    setActiveCommande(commande)
                                    setIsDeleteOpen(!isDeleteOpen)
                                }}  danger icon={<DeleteOutlined />} />,
                            ]}>
                                <p  style={{width: "100%", display: 'flex', justifyContent: 'space-between'}}><span>ID Commande:</span> <span>{commande.ID_Commande}</span></p>
                                <p  style={{width: "100%", display: 'flex', justifyContent: 'space-between'}}><span>ID Produit:</span> <span>{commande.ID_Produit}</span></p>
                                <p  style={{width: "100%", display: 'flex', justifyContent: 'space-between'}}><span>ID Fournisseur:</span> <span>{commande.ID_Fournisseur}</span></p>

                                <p  style={{width: "100%", display: 'flex', justifyContent: 'space-between'}}><span>Quantité:</span> <span>{commande.Qte_Commande}</span></p>
                                <p  style={{width: "100%", display: 'flex', justifyContent: 'space-between'}}><span>Prix Total:</span> <span>{commande.Prix_Total}</span></p>
                                <p  style={{width: "100%", display: 'flex', justifyContent: 'space-between'}}><span>Date de la commande:</span> <span>{commande.Date_Commande}</span></p>
                            </Card>
                        </Badge.Ribbon>
                    </li>
                ))}
            </ul> 
            </Reveal>}
        </Content>
        <CreateCommande update={getCommandes} isOpen={isAddOpen} cancel={()=>{setIsAddOpen(false)}} confirm={()=>{setIsAddOpen(false)}}/>
        <ModifCommande cancel={()=>{setIsModifOpen(false)}} confirm={()=>{setIsModifOpen(false)}} commande={activeCommande} isOpen={isModifOpen} update={getCommandes} />
        <DeleteCommande cancel={()=>{setIsDeleteOpen(false)}} confirm={()=>{setIsDeleteOpen(false)}} isOpen={isDeleteOpen} commande={activeCommande} update={getCommandes}></DeleteCommande>
        <Terminate cancel={()=>{setIsTerminateOpen(false)}} commande={activeCommande} update={getCommandes} isOpen={isTerminateOpen}></Terminate>
    </AuthenticatedLayout>

    );
}