import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react"; 
import { Language, Aspect } from "@/utils/common";

const PlotLevel = ({ levelInfo }) => {
  const categories: Aspect[] = [
    "vocabulary",
    "grammar",
    "listening",
    "conversation",
    "pronunciation",
  ];

  // assume all categories share the same number of levels
  const levels = levelInfo[categories[0]]?.map((x: any) => x.level) || [];

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Levels</th>
          {categories.map((cat) => (
            <th key={cat}>{cat}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {levels.map((level: string, idx: number) => (
          <tr key={level}>
            <td>{level}</td>
            {categories.map((cat) => (
              <td key={cat}>{levelInfo[cat][idx].description}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Levels = () =>{
    const {user} = useUser();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
    const language = user?.language || "english";
    const [levelInfo, setLevelInfo] = useState();

    useEffect(() => {
        setLoading(true);
        const loadData = async () => {
            try {
            const module = await import("@/assets/other/levelInformation.json");
            setLevelInfo(module[language]);

            } catch {
            setError("Error loading the file");

            } finally {
            setLoading(false);
            }
        }

        loadData();
     
    }, [language])
    

    if(error != "") return <p>{error}</p>
    return(
        <>
            {!loading && error === "" && ( <PlotLevel levelInfo = {levelInfo}/> )}
        </>
  
    )

}

export default Levels;