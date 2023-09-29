import "./editor.css"
export default function Problem() {
    let problemobject = {
        name: "Stack in C",
        discription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis facilis, unde recusandae atque iusto vel quisquam debitis dolores hic est vitae repellat officia tempore similique ab suscipit. Repudiandae, repellat aspernatur.",
        images: "",//path will be given
    }

    return (
        <ProblemCode name={problemobject.name} discription={problemobject.discription} ></ProblemCode>
    )


    function ProblemCode(props) {
        return (
            <div className="problem-container">
                <h1>{props.name}</h1>
                <p>{props.discription}</p>
                <p>{props.image}</p>
            </div>
        )
    }
}
