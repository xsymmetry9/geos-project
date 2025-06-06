import { useState } from "react";

export const CreateStudent = () => {
    const [form, setForm] = useState({name: "", language: ""});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(`Name: ${form.name} Language: ${form.language}`);
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prevForm) => ({...prevForm, [name]: value}));
    }
    return(
        <div className="w-full static max-w-lg m-auto">
        
            <h1 className="font-secondary text-center text-2xl font-bold">Create A student</h1>
            <div className="text-gray-700 capitalize">
                <form onClick={handleSubmit}>
                    <label htmlFor="name">
                        <span>Name</span>
                    </label>
                    <input 
                        className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]"
                        type="text" 
                        name="name" 
                        onChange={handleInput}/>
                    <label htmlFor="language">
                        <span>Language</span>
                    </label>
                    <input 
                        className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]"
                        type="text" 
                        name="language" 
                        onChange={handleInput}/>

                    <div className="flex gap-2 justify-center mt-3" >
                        <input 
                            className="btn btn-primary"
                            type="submit" 
                            value={"Done"} 
                            onChange={handleInput}/>
                    </div>
         
                </form>
            </div>
        </div>
    )
}

export const ViewStudents = () =>{
    return(
        <>
            <h1>View all students</h1>
        </>
    )
}