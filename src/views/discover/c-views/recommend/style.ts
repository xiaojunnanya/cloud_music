import styled from 'styled-components'

export const RecommentStyled = styled.div`
> .content {
    border: 1px solid #d3d3d3;
    /* background-image: url(${require('@/assets/img/wrap-bg.png')}); */
    display: flex;

    > .left {
      padding: 20px;
      width: 690px;
    }

    > .right {
      padding-left: 1px;
      width: 248px;
      border-left:1px solid #D3D3D3;
    }
  }
`