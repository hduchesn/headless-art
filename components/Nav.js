
const Nav = () => {
    return (
        <header role="banner">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand " href="index.html">Industrial</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample05">
                        <ul className="navbar-nav pl-md-5 ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="index.html">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link  active" href="about.html">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="projects.html">Projects</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="services.html" id="dropdown04"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Services</a>
                                <div className="dropdown-menu" aria-labelledby="dropdown04">
                                    <a className="dropdown-item" href="services.html">Architectural Design</a>
                                    <a className="dropdown-item" href="services.html">Interior</a>
                                    <a className="dropdown-item" href="services.html">Building</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="blog.html">Blog</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="contact.html">Contact</a>
                            </li>
                        </ul>

                        <div className="navbar-nav ml-auto">
                            <form method="post" className="search-form">
                                <span className="icon ion ion-search"></span>
                                <input type="text" className="form-control" placeholder="Search..."/>
                            </form>
                        </div>

                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Nav
