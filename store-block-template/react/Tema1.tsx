import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import axios from 'axios'

const CSS_HANDLES = ['tema1']


interface Tema1Props {

}



const Tema1: StorefrontFunctionComponent<Tema1Props> = ({}) => {

    const handles = useCssHandles(CSS_HANDLES)

    const [nume, setNume] = useState("");
    const [mesaj, setMesaj] = useState("");
    const [email, setEmail] = useState("");
    const [requestType, setRequestType] = useState("");
    const [description, setDescription] = useState("");
    
   // const [validForm, setValidForm] = useState("");

    function modificareNume(e:any){
        const newValue = e.target.value;
        console.log("Valore Nume: ",newValue);
        setNume(newValue);
        
        }
    function modificareEmail(e:any){
        const newValue = e.target.value;
        console.log("Valore Email: ",newValue);
        setEmail(newValue);
    
    }

    function modificareTipCerere(e:any){
        const newValue = e.target.value;
        console.log("Valoare pt tip cerere ", newValue);
        setRequestType(newValue);
    }

    function modificareDescriere(e:any){
        const newValue = e.target.value;
        console.log("Noua valoare a descrierii", newValue);
        setDescription(newValue);
    }

    // function gestioneazaSubmit(e:any){
    //     e.preventDefault(); 
    //     console.log("Valoare nume: ",nume);
    //     console.log("Valore Email: ",email);
    //     console.log("Valoare pt tip cerere ", requestType);
    //     console.log("Noua valoare a descrierii", description);

    // }
    
    // Incecrcare gestionare toate input-urile intr-o sg fct
    // const [inputs, setInputs] = useState({})
    // const [inputs, setInputs] = useState({
    //     email: "",
    //     tipCerere: "",
    //     descriere: ""
    // });

    // function gestioneazaInput(e:any){
    //     const value = e.target.value;
    //     const name = e.targte.name;
    //     setInputs( values => ({...values, [name]: value}))
    // }

    function validForm() {
        if(email.length === 0){
            
            useEffect(() => {
                // setMesaj("Campul de email nu poate fi gol !");
                const eroare = "Campul de email nu trb sa fie gol";
                setMesaj(eroare);
              });
            return false;
        }else 
        {
            useEffect(() => {
                // setMesaj("Campul de email nu poate fi gol !");
                const eroare = "";
                setMesaj(eroare);
              });
            return true;
        }
        
    }

    async function adaugaCerere() {
        const body = {
            "name": nume,
            "email": email,
            "requestType": requestType,
            "description": description
        }

        await axios.post(`/_v/cerere`,body)
        
       // console.log('Data received in FE: ', body)
            //   try {
                
            //     // setClientsData(body) Aici adauga metoda corecta de postare ( trimite spre postare )
        
            //   } catch(e){
            //     console.error(e)
            //   }
     }
    

    return (
        <div className={`${handles.tema1}`}>
            <form onSubmit={adaugaCerere}>
                <label>
                Nume:
                    <input type="text" name="nume" value={nume} onChange={modificareNume}/>
                    
                    {/* {validForm() === true && <div> {mesaj} </div>} */}
                    {/* {validForm() === false && <div> {mesaj} </div>} */}
                </label><br/><br />
                <label>
                Email:
                    <input type="email" name="email" value={email} onChange={modificareEmail}/>
                    {validForm() ? "" : mesaj}
                    {/* {validForm() === true && <div> {mesaj} </div>} */}
                    {/* {validForm() === false && <div> {mesaj} </div>} */}
                </label><br/><br />
                <label>
                Tip cerere:
                    <select name="requestType" value={requestType} onChange={modificareTipCerere}>
                        <option value="retur" selected>Retur</option>
                        <option value="intrebare_produs">Intrebare produs</option>
                        <option value="comanda_intarziata">Comanda intarziata</option>
                    </select>
                </label><br /><br />
                <label>
                Descriere: 
                    <textarea rows={4} cols={40} value={description} onChange={modificareDescriere} placeholder='Adauga aici descrierea ta'>
                    
                    </textarea>
                </label><br/> <br/>
                <input type="submit" value="Submit"/>
            </form>
            <br/>
        </div>
    );
}

export default Tema1