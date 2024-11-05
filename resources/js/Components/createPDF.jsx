import { Modal, Button, message } from "antd";
import { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: "white",
    },
    section:{
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
})

export default function CreatePDF ({isOpen, onCancel, rapport}){

    const [messageAPI, contextHolder] = message.useMessage();

    const handleSubmit = ()=>{
        setTimeout(()=>{onCancel()}, 300);
        messageAPI.success("Fichier téléchargé")
    }

    const PDFcomposant = ()=>(
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={{textAlign: 'center'}}>RAPPORT DE LA COMMANDE</Text>
                    <Text>ID Rapport: {rapport.ID_Rapport} Date:{rapport.Date_Rapport}</Text>
                    <Text style={{marginBottom:'1rem'}}>ID Commande: {rapport.commande.ID_Commande} Date:{rapport.commande.Date_Commande}</Text>
                    <Text style={{marginBottom:'1rem'}}>_________________________________________________</Text>
                    <Text>Produit: {rapport.commande.produit.Nom_Produit}</Text>
                    <Text>Fournisseur: {rapport.commande.fournisseur.Nom_Fournisseur}</Text>
                    <Text>Quantité: {rapport.commande.Qte_Commande}</Text>
                    <Text>Prix Total: {rapport.commande.Prix_Total}</Text>
                    <Text style={{marginBottom:'1rem'}}>_________________________________________________</Text>
                    <Text>Note: {rapport.Note}</Text>
                </View>
            </Page>
        </Document>
    )

    return (
        <Modal title="Génerer un PDF" open={isOpen} okText={
            <PDFDownloadLink document={<PDFcomposant/>} fileName="Rapport.pdf">
                {({loadign})=> loadign? 'Chargement...': 'Télécharger'}
            </PDFDownloadLink>
        }
            onCancel={onCancel}
            onOk={handleSubmit}
        >
            {contextHolder}
            Voulez-vous générer un PDF du rapport?
        </Modal>
    )
}