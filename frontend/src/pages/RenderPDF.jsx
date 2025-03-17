import React from "react";
import { Page, Text, View, Document, StyleSheet, Image, PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
const styles = StyleSheet.create({
    page: {
 
    },
    section: {
        display: "flex",
        flexDirection: "row",
        fontSize: 10
        
    },
    column: {
        flex: 1,
        padding: 5,
    },
    image:{
        width: 110,
        height: 60,
    },
    titleImageSection: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
        marginTop: 30,
        alignItems: "center",
        fontSize: 16,
        fontWeight: 600
    }
});

const logo = `${window.location.origin}/logo.jpg`; // Correct way to reference public folder assets

const MyDocument = () =>{
    return(
        <Document>
        <Page size ="A4" style={styles.page}>
            <View style={styles.titleImageSection}>
                <Image style={styles.image} src={logo}/>     
                <Text>Student Progress Report</Text>           
            </View>
            <View style={styles.section}>
                <View style={styles.column}>
                    <Text>Name: Gary</Text>
                    <Text>Course: PL</Text>
                    <Text>EF1</Text>
                </View>
                <View style={styles.column}>
                    <Text>Date: 5/17/2025</Text>
                    <Text>Attendance: 20</Text>
                    <Text>Total Lessons: 30</Text>
                    <Text>% of Attendance: 40%</Text>

                </View>
            </View>
        </Page>
    
        </Document>
    )
}
const RenderPDF = () =>{

    return(
        <div className="flex flex-col justify-center items-center gap-3">
            <PDFViewer width={"1000px"} height={"800px"} >
                <MyDocument />
            </PDFViewer>
            <PDFDownloadLink document={<MyDocument />} fileName="document.pdf">
            {( {loading}) => (
                <button className="btn-primary w-[150px]" onClick={() => {}}>{loading ? "Loading ... " : "Download PDF"}</button>
            )}
            </PDFDownloadLink>
        </div>

    )

}

export default RenderPDF;