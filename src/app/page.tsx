import styles from './page.module.css'


export default function Home() {
    return (
        <main className={"w-full md:w-[640px] h-screen mx-auto border border-gray-800"}>

            <div className={'w-full h-full flex flex-col'}>
                <div className={'grow'}>
                    <div className="bg-repeat-x bg-center w-full h-16"
                         style={{backgroundImage: "url(/image/pen2.png)", backgroundSize: "width:16px; height:64px;"}}/>


                </div>


                <div className={'shrink-0'}>

                    <progress className="progress progress-accent w-56" value="100" max="100"></progress>
                    <progress className="progress progress-error w-56" value="100" max="100"></progress>

                </div>
            </div>
        </main>
    )
}
