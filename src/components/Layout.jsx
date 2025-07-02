export default function Layout(props){
    const { children } = props;
    const header = (
        <header>
            <h1 className="text-gradient" >The Brogram</h1>
            <p><strong>The 30 Simple Workouts Program</strong></p>
        </header>
    )

    const footer = (
        <footer>
            <p>Built By <a  target="_blank" href="https://matheusfael.github.io/matheusfaelson_portifolio/">Matheus Fael</a><br />Styled With <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a></p>
        </footer>
    )


    return (
        <div>
            {header}
            {children}
            {footer}
            
        </div>
    )   
}