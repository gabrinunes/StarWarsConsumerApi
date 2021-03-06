import React from "react"
import {render} from "@testing-library/react-native"

import ResultList from "../pages/ResultList"

jest.mock("@react-navigation/native")



describe("Characters List",()=>{
    it("should be able to render",()=>{
        render(<ResultList/>)
    })
})