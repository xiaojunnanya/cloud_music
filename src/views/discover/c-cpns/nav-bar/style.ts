import styled from 'styled-components'

export const NavBarStyled = styled.div`
    height: 30px;
    background-color: #C20C0C;

    .nav{
        display: flex;
        padding-left: 180px;
        position: relative;
        top: -4px;

        .item {
            a {
            display: inline-block;
            height: 20px;
            line-height: 20px;
            padding: 0 13px;
            margin: 7px 17px 0;
            color: #fff;

            &:hover, &.active {
                text-decoration: none;
                background-color: #9B0909;
                border-radius: 20px;
            }
            }
        }
    }
`