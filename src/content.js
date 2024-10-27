import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './cont.css';
import { useEffect, useReducer, useState } from 'react';

function Content() {
    const [newWork, setNewWork] = useState();

    function MiseAjourTravail(travails, action) {
        switch (action.type) {
            case "Add Task":
                return [...travails, action.value];
            case "Supprimer":
                return travails.filter(task => task !== action.value);
            case "Complete":
                return travails.map(task => 
                    task === action.value ? { ...task, completed: !task.completed } : task
                );
            default:
                return travails;
        }
    }

    const [travails, setTravail] = useReducer(MiseAjourTravail, GetTravailStocker());

    function AjouterTask() {
        if (newWork !== '') {
            setTravail({ type: "Add Task", value: { task: newWork, completed: false } });
            setNewWork("");
        }
    }

    function GetTravailStocker() {
        return localStorage.getItem("travails") ? JSON.parse(localStorage.getItem("travails")) : [];
    };

    useEffect(() => {
        localStorage.setItem("travails", JSON.stringify(travails));
    }, [travails]);

    return (
        <>
            <main>
                <table className='table'>
                    <tbody className='container'>
                        <tr className="table-primary">
                            <td>Tasks</td>
                            <td>Etat</td>
                            <td>Delete</td>
                        </tr>
                        {
                            travails.map(work => (
                                <tr className="table-dark" key={work.task}>
                                    <td 
                                        id="text-container" 
                                        className="text-container" 
                                        style={{
                                       width:'42%',maxWidth:'42%',  height:'100px',textDecoration: work.completed ? 'line-through' : 'none',
                                        }}
                                    >
                                        {work.task}
                                    </td>
                                    <td style={{width:'40%',maxWidth:'40%'}} className="button-container">
                                        <button className='btn btn-outline-light w-100'
                                            style={{  height: '100%' }}
                                            onClick={() => { setTravail({ type: "Complete", value: work }) }}
                                        >
                                            {work.completed ? "Uncomplete" : "Complete"}
                                        </button>
                                    </td>
                                    <td style={{width:'18%',maxWidth:'18%'}}>
                                        <button 
                                            className="btn btn-danger w-100" 
                                            
                                            onClick={() => { setTravail({ type: "Supprimer", value: work }) }}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <textarea className='input-group-text w-70' value={newWork} onChange={(event) => setNewWork(event.target.value)} type='text' />
                    <button onClick={AjouterTask} className='btn btn-outline-info'>Add task</button>
                </div>
            </main>
        </>
    );
}

export default Content;
