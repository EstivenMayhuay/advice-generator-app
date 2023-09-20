import { useEffect, useState } from "react";

const Advice = () => {
    const [advice, setAdvice] = useState(null);
    const [loading, setLoading] = useState(false);

    const getAdvice = async () => {
        try {
            setLoading(true);
            const res = await fetch("https://api.adviceslip.com/advice");
            const body = await res.json();
            console.log(body.slip);
            setAdvice(body.slip);
            setLoading(false);
        } catch (error) {
            setLoading(true);
        }
    }

    useEffect(() => {
        getAdvice()
    }, [])

    return (
        <>
           
            {
                advice &&
                <div className="relative cardAdvice w-80 bg-color-second p-5 shadow-md rounded-lg">
                    <div className="cardAdvice__head py-4">
                        <p className="tracking-wider text-color-third text-md">ADVICE #{advice.id}</p>
                    </div>

                    <div className="cardAdvice__body pb-8">
                        {
                            loading == true
                            ? <h1 className="text-white text-lg">loading...</h1>
                            : <p className="text-lg text-white font-medium">"{advice.advice}"</p>
                        }

                        <div className="pt-8">
                            <img src="/images/pattern-divider-desktop.svg" />
                        </div>
                    </div>

                    <button className="cardAdvice__button bg-color-third absolute flex items-center justify-center p-2 rounded-full left-0 right-0 -bottom-4 m-auto w-12 h-12 cursor-pointer duration-300 hover:brightness-125 hover:rotate-180 active:scale-90" onClick={() => getAdvice()}>
                        <img src="/images/icon-dice.svg" />
                    </button>
                </div>
            }            
        </>
    )
}

export default Advice;