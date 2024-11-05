import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Layout, Button, Input, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateRapport from "@/Components/createRapport";
import ModifRapport from "@/Components/modifyRapport";
import { useState, useEffect } from "react";
import { Zoom as Reveal } from "react-awesome-reveal";
import { DeleteOutlined, EditOutlined, FilePdfOutlined } from "@ant-design/icons";
import CreatePDF from "@/Components/createPDF";
import DeleteRapport from "@/Components/deleteR";

const {Content, Header} = Layout

export default function rapport({ auth }) {

    const [isAddOpen, setIsAddOpen] = useState (false);
    const [isModifOpen, setIsModifOpen] = useState (false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isPDFOpen, setIsPDFOpen] = useState(false);

    const [rapport, setrapport] = useState ([]);
    const [activerapport, setActiverapport] = useState(null)


    const getRapports = async () => {
        try {
            const url = `http://localhost:8000/api/rapport`; 
            
            const response = await fetch(url);

            const produits = await response.json();
            
            setrapport(produits)
            
        } catch (error) {
            console.error('Erreur lors de la requête API :', error);
        }
    }

    useEffect(()=>{
        getRapports()
    }, [])

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Rapport</h2>}
    >
        <div style={{display: 'flex', gap: '1rem', width: '100%', justifyContent: 'flex-end'}}>
            <Button onClick={()=>{setIsAddOpen(!isAddOpen)}} icon={<PlusOutlined />} type="primary">Ajouter</Button>
        </div>
        <Content>
            {Array.isArray(rapport) && <Reveal duration={200} cascade triggerOnce>
                <ul style={{
                listStyle: 'none',

            }}>
                {rapport.map((rapport, index)=>(
                    <li className="dataList" key={index} style={{marginBottom: '1rem'}}>
                        <Card actions={[
                            <Button onClick={()=>{
                                setActiverapport(rapport)
                                setIsPDFOpen(!isPDFOpen)
                            }} icon={<FilePdfOutlined/>} />,
                            <Button onClick={()=>{
                                setActiverapport(rapport)
                                setIsModifOpen(!isModifOpen)
                            }} icon={<EditOutlined />} />,
                            <Button onClick={()=>{
                                setActiverapport(rapport)
                                setIsDeleteOpen(!isDeleteOpen)
                            }}  danger icon={<DeleteOutlined />} />
                        ]}>
                            <p  style={{width: "100%", display: 'flex', justifyContent: 'space-between'}}><span>ID Commande:</span> <span>{rapport.ID_Commande}</span></p>
                            <p  style={{width: "100%", display: 'flex', justifyContent: 'space-between'}}><span>Date:</span> <span>{rapport.Date_Rapport}</span></p>
                            
                            <p  style={{width: "100%", display: 'flex', justifyContent: 'space-between'}}><span>Note:</span> <span></span></p>
                            <p>{rapport.Note}</p>
                        </Card>
                    </li>
                ))}
            </ul> 
            </Reveal>}  
        </Content>
        <CreateRapport isOpen={isAddOpen} cancel={()=>{setIsAddOpen(false)}} confirm={()=>{setIsAddOpen(false)}} update={getRapports}  ></CreateRapport>
        <ModifRapport isOpen={isModifOpen} cancel={()=>{setIsModifOpen(false)}} confirm={()=>{setIsModifOpen(false)}} rapport={activerapport} update={getRapports}></ModifRapport>
        <DeleteRapport rapport={activerapport} update={getRapports} isOpen={isDeleteOpen} cancel={()=>{setIsDeleteOpen(false)}} confirm={()=>{setIsDeleteOpen(false)}}></DeleteRapport>
        <CreatePDF isOpen={isPDFOpen} onCancel={()=>{setIsPDFOpen(false)}} rapport={activerapport}></CreatePDF>
    </AuthenticatedLayout>

    );
}