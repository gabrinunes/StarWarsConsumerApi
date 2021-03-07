import React from "react"
import {act, render} from "@testing-library/react-native"

import ResultList from "../pages/ResultList"

jest.mock("@react-navigation/native")

describe("ResultScreen",()=>{
    it("should be able to render", ()=>{
       act(()=>{
          <ResultList/>
      })
    })
})
