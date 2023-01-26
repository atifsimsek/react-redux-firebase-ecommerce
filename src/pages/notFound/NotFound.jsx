import { Link } from 'react-router-dom'
import styles from './notFound.module.scss'

const NotFound = () => {
    return (
        <div className={styles["not-found"]}>
            <div>
                <h2>404</h2>
                <p>Opss, page not found.</p>

                <button className='--btn'>
                    <Link to={"/react-redux-firebase-ecommerce/"}>
                        &larr;Back To Home
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default NotFound