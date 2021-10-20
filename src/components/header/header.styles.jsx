import styled from "styled-components";
import {Link} from "react-router-dom";

export const HeaderContainer = styled.div`
    height: 70px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`

export const LogoLinkContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`
export const OptionsContiner = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

export const OptionLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
`
