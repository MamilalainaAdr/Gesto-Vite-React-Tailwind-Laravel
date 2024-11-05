import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Layout, Button, Input, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Zoom as Reveal } from "react-awesome-reveal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CreateFournisseur from "@/Components/createFournisseur";
import ModifFournisseur from "@/Components/modifFournisseur";
import DeleteFournisseur from "@/Components/deleteFournisseur";

const {Content, Header} = Layout

export default function Fournisseur({ auth }) {

    const [isAddOpen, setIsAddOpen] = useState (false);
    const [isModifOpen, setIsModifOpen] = useState (false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [name, setName] = useState('')

    const [fournisseurs, setFournisseurs] = useState ([]);
    const [activeFournisseur, setActiveFournisseur] = useState (null);

    const getFournisseurs= async () => {
        try {
            const url = 'http://localhost:8000/api/fournisseur?name=' + name ; 
            
            const response = await fetch(url);

            const fournisseurs = await response.json();
            
            setFournisseurs(fournisseurs)
            
        } catch (error) {
            console.error('Erreur lors de la requête API :', error);
        }
    }

    useEffect(()=>{
        getFournisseurs()
    }, [name])

    useEffect(
        ()=>{getFournisseurs()}
    , [])


    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fournisseur</h2>}
    >
        <div style={{display: 'flex', gap: '1rem'}}>
            <Input value={name} onChange={(e)=>{setName(e.target.value)}} size="small" placeholder="Nom du Fournisseur"></Input>
            <Button onClick={()=>{setIsAddOpen(!isAddOpen)}} icon={<PlusOutlined />} type="primary">Ajouter</Button>
        </div>
        <Content>
        {Array.isArray(fournisseurs) && <Reveal duration={200} cascade triggerOnce>
                <ul style={{
                listStyle: 'none',

            }}>
                {fournisseurs.map((fournisseur, index)=>(
                    <li className="dataList" key={index} style={{marginBottom: '1rem'}}>
                        <Card actions={[
                            <Button onClick={()=>{
                                setActiveFournisseur(fournisseur)
                                setIsModifOpen(!isModifOpen)
                            }} icon={<EditOutlined />} />,
                            <Button onClick={()=>{
                                setActiveFournisseur(fournisseur)
                                setIsDeleteOpen(!isModifOpen)
                            }} danger icon={<DeleteOutlined />} />
                        ]} bordered title={fournisseur.Nom_Fournisseur} extra={fournisseur.Email}>
                            {fournisseur.Adresse}
                        </Card>
                    </li>
                ))}
            </ul> 
            </Reveal>}
        </Content>
        <CreateFournisseur update={getFournisseurs} isOpen={isAddOpen} cancel={()=>{setIsAddOpen(false)}} confirm={()=>{setIsAddOpen(false)}} />
        <ModifFournisseur update={getFournisseurs} isOpen={isModifOpen} fournisseur={activeFournisseur} cancel={()=>{setIsModifOpen(false)}} confirm={()=>{setIsModifOpen(false)}} />
        <DeleteFournisseur cancel={()=>{setIsDeleteOpen(false)}} confirm={()=>{setIsDeleteOpen(false)}} fournisseur={activeFournisseur} isOpen={isDeleteOpen} update={getFournisseurs}  />
    </AuthenticatedLayout>

    );
}