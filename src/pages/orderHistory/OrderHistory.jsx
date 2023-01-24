import useFetchCollection from '../../customHooks/useFetchCollection'
import styles from './OrderHistory.module.scss'

const OrderHistory = () => {
const {data, isLoading} = useFetchCollection("orders")

console.log(data)
  return (
    <div>
      asdfs
    </div>
  )
}

export default OrderHistory