import {Triangle} from 'react-loader-spinner'

export const Charging = () => {
  return (
    <div className='mx-auto charging'>
        <Triangle
           height="200"
           width="200"
           color="#128BD7"
           ariaLabel="triangle-loading"
           wrapperStyle={{}}
           wrapperClassName=""
           visible={true}
        />
    </div>
  )
}
