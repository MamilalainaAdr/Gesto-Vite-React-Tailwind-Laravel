import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Layout, Button, Input, Card, Badge } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Zoom as Reveal } from "react-awesome-reveal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CreateProduct from "@/Components/createProduits";
import ModifyProduct from "@/Components/modifyProduits";
import DeleteProduct from "@/Components/deleteProduit";

const {Content, Header} = Layout

export default function produit({ auth }) {

    const [isAddOpen, setIsAddOpen] = useState (false);
    const [isModifOpen, setIsModifOpen] = useState (false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [name, setName] = useState('')
    
    const [produits, setProduits] = useState ([]);
    const [activeProduit, setActiveProduit] = useState (null);
    const getProducts = async () => {
        try {
            const url = `http://localhost:8000/api/produit?name=${name}`; 
            
            const response = await fetch(url);

            const produits = await response.json();
            setProduits(produits)
            
        } catch (error) {
            console.error('Erreur lors de la requête API :', error);
        }
    }

    useEffect(()=>{
        getProducts()
    }, [name])

    useEffect(
        ()=>{getProducts()}
    , [])

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Produit</h2>}
    >
        <div style={{display: 'flex', gap: '1rem'}}>
            <Input value={name} onChange={(e)=>{setName(e.target.value)}} size="small" placeholder="Nom du Produit"></Input>
            <Button onClick={()=>{setIsAddOpen(!isAddOpen)}} icon={<PlusOutlined />} type="primary">Ajouter</Button>
        </div>
        <Content>
            {Array.isArray(produits) && <Reveal duration={200} cascade triggerOnce>
                <ul style={{
                listStyle: 'none',

            }}>
                {produits.map((produit, index)=>(
                    <li className="dataList" key={index} style={{marginBottom: '1rem'}}>
                        <Card actions={[
                            <Button onClick={()=>{
                                setActiveProduit(produit)
                                setIsModifOpen(!isModifOpen)
                            }} icon={<EditOutlined />} />,
                            <Button onClick={()=>{
                                setActiveProduit(produit)
                                setIsDeleteOpen(!isDeleteOpen)
                            }}  danger icon={<DeleteOutlined />} />
                        ]} bordered title={produit.Nom_Produit + ' - ' + produit.Prix_Unitaire + "Ar"} extra={produit.Qte_En_Stock + ' unité(s)'}>
                            {produit.Description}
                        </Card>
                    </li>
                ))}
            </ul> 
            </Reveal>}
        </Content>
        <CreateProduct update={getProducts} isOpen={isAddOpen} cancel={()=>{setIsAddOpen(false)}} confirm={()=>{setIsAddOpen(false)}} />
        <ModifyProduct product={activeProduit} update={getProducts} isOpen={isModifOpen} cancel={()=>setIsModifOpen(false)} confirm={()=>{setIsModifOpen(false)}} />
        <DeleteProduct update={getProducts} product={activeProduit} cancel={()=>{setIsDeleteOpen(false)}} confirm={()=>{setIsDeleteOpen(false)}} isOpen={isDeleteOpen}></DeleteProduct>
    </AuthenticatedLayout>

    ); 
}