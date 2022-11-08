import React, { useState } from 'react'

const Filter = ({ setDifficulty, handleSubmit }) => {

    const [endpoint, setEndpoint] = useState("")

    return (
        <div className='filter'>
            <h3>Filter Your Content</h3>
            <nav>
                <button onClick={() => setDifficulty('Easy')}>Easy</button>
                <button onClick={() => setDifficulty('Medium')}>Medium</button>
                <button onClick={() => setDifficulty('Hard')}>Hard</button>
                <button onClick={() => setDifficulty('')}>ALL</button>
            </nav>
            <form onSubmit={handleSubmit(endpoint)}>
                <label><strong>Search Problems</strong> (Note: you can only search for keywords that are in the title)</label>
                <input 
                    type="text" 
                    onChange={(e) => setEndpoint(e.target.value)}
                    value={endpoint}    
                />
            </form>
            
        </div>
    )
}

export default Filter