import { InfinitySpin } from  'react-loader-spinner'

import { Wrapper } from './Loader.styled'

export const Loader = () => {
    return (
<Wrapper>
<InfinitySpin 
  width='200'
  color="green"
/>
</Wrapper>
            )
}