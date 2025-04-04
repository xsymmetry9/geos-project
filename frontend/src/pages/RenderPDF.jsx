import React from "react";
import { Page, Text, View, Document, StyleSheet, Image, PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
const styles = StyleSheet.create({
    page: {
        padding: 20
        // margin: 30.2
        // marginLeft: 20,
        // marginRight: 30
    },
    section: {
        display: "flex",
        flexDirection: "row",
        fontSize: 10,
        paddingBottom: 12,
        paddingTop: 12,
        
    },
    columnLeft: {
        flex: 1,
        paddingLeft: 96,

    },
    columnRight: {
        flex: 1,
        paddingLeft: 96,
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
    },

    //Table Styles
    table:{
        width: "100%",
        borderColor: "black",
        borderWidth: 1,
    },
    tableRow:{
        flexDirection: "row",
    },
    tableCellHeader: {
        flex: 1,
        fontSize: 8.5,
        fontWeight: "bold",
        padding: 2.5,
        textAlign: "center",
        backgroundColor: "rgba(0, 161, 173, 1)",
        color: "white",

    },
    tableCell: {
        flex: 1,
        fontSize: 8.5,
        padding: 2.5,
        textAlign: "center",

    },
    evenRow: {
        backgroundColor: "rgba(0, 161, 173, 0.2)",
    },
    oddRow: {
        backgroundColor: "#fff"
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
            <View id="student-info" style={styles.section}>
                <View style={styles.columnLeft}>
                    <Text>Name: Gary</Text>
                    <Text>Course: PL</Text>
                    <Text>EF1</Text>
                </View>
                <View style={styles.columnRight}>
                    <Text>Date: 5/17/2025</Text>
                    <Text>Attendance: 20</Text>
                    <Text>Total Lessons: 30</Text>
                    <Text>% of Attendance: 40%</Text>
                </View>
            </View>
            <View id="table-info" style={styles.table}>
                {/* Header */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableCellHeader}></Text>
                    <Text style={styles.tableCellHeader}>Vocabulary</Text>
                    <Text style={styles.tableCellHeader}>Grammar</Text>
                    <Text style={styles.tableCellHeader}>Pronunciation</Text>
                    <Text style={styles.tableCellHeader}>Listening</Text>
                    <Text style={styles.tableCellHeader}>Conversation</Text>
                    <Text style={styles.tableCellHeader}>Total</Text>
                    <Text style={styles.tableCellHeader}>Average</Text>
                </View>
                {/* Table Rows */}
                {[
                    ["Initial", 7, 8, 7.5, 7.5, 5, 35, 7.0],
                    ["Target", 7, 8, 7.5, 7.5, 5, 35, 7.0],
                    ["Final", 7, 8, 7.5, 7.5, 5, 35, 7.0]
                ].map((row, index) => (
                        <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                            {row.map((cell, cellIndex) => (
                                <Text key={cellIndex} style={styles.tableCell}>{cell}</Text>
                            ))}
                        </View>
                    ))}
                </View>
            </Page>
    
    </Document>
    );
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