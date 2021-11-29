import React from 'react';
import styled from "styled-components";

const SidebarContainer = styled.div`
    flex: 1;
    height: calc(100vh - 70px);
    background-color: white;
    min-width: 150px;
    position: sticky;
    top: 70px;
`;
const SidebarWrapper = styled.div`

`;
const SidebarMenu = styled.div`

`;
const SidebarList = styled.ul`
    list-style: none;
    background-color: green;
    padding: 0;
`;
const SidebarItem = styled.li`
    cursor: pointer;
    font-size: 17px;
    line-height: 56px;
    color: #4B4B4B;
    color: ${
        props => props.active ?
        "#FFFFFF" : "#4B4B4B"
    };
    background-color: ${
        props => props.active ?
        "#E00019" : "#EDEDED"
    };
    letter-spacing: 0px;
    padding-left: 18px;
    &:hover {
        background-color: #4B4B4B;
        color: #FFFFFF;
    }
    &:hover {
        background-color: #4B4B4B;
        color: #FFFFFF;
    }
`;

const Sidebar = () => {
    return (
        <SidebarContainer>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarList>
                        <SidebarItem active={true}>
                            Daily Draw
                        </SidebarItem>
                        <SidebarItem>
                            Weekly Draw
                        </SidebarItem>
                        <SidebarItem>
                            Credit Entries
                        </SidebarItem>
                    </SidebarList>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
