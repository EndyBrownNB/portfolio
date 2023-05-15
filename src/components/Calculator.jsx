import React from "react";
import cl from './UI/Calc/Calc.module.css'

const Calculator = ({inp, setInp}) =>{

    const btnArr = [
        '+','-','*','/',
        '7','8','9','%',
        '4','5','6','C',
        '1','2','3','=']; //16 btns

    const take = (e) =>{
        let btnclk = parseInt(e.target.id)
        let btnoper = e.target.id

            if (btnoper == 'C') {
                let newval = ''
                setInp({ val: newval });
            }
            else if (btnoper == '=') {
                //тут нужно распарсить строку, выделить числа и отделить знаки от 
                //от символов соблюдая последователность символов
                const result = eval(inp.val)
                setInp({ val: result }); 
            }
            else if (!isNaN(btnclk)) {
                let newval = inp.val+btnclk
                setInp({ val: newval });
            } else {
                let newval = inp.val+btnoper
                setInp({ val: newval });
            }
        
        console.log(typeof(btnclk))
        console.log(btnclk)
    }

    return(
        <div className={cl.calc}>
            <input
                className={cl.calcinpt}
                value = {inp.val}
                onChange = {e => setInp(take)}
            ></input>
            {btnArr.map((btn, index) => (
                <button 
                    key={index}
                    id={btn} 
                    onClick = {take}
                    className={cl.calcbtn}>{btn}
                </button>
            ))}
            <button 
            onClick = {take}
            className={cl.calcbtn} id={''} style={{width:'98%'}}></button>
        </div>
    )
}
export default Calculator;