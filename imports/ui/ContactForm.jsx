import React, { useState } from "react";
import { ContactsCollection } from "../api/ContactsCollection";

export const ContactForm = () => {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const saveContact = () => {
        ContactsCollection.insert({nome, email, imageUrl});
        setNome( "" );
        setEmail("");
        setImageUrl("");
    }

    return (
        <form>

            <div>

                <label htmlFor='name'>Nome: </label>
                <input type="text" name="inputNome" id="name" onChange={ e => setNome( e.target.value )} value={nome}/>

            </div>

            <div>

                <label htmlFor='email'>Email: </label>
                <input type="email" name="inputEmail" id="email" onChange={ e => setEmail( e.target.value )} value={email}/>

            </div>

            <div>

                <label htmlFor='imageUrl'>Link da Imagem: </label>
                <input type="text" name="inputImagem" id="imageUrl" onChange={ e => setImageUrl( e.target.value )} value={imageUrl}/>

            </div>

            <div>

                <button type="button" onClick={saveContact}>Salvar contato</button>

            </div>

        </form>
    )
}