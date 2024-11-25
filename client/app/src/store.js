import { configureStore } from "@reduxjs/toolkit"
import testSlice from "./features/test/testSlice.js"

export const store = configureStore({
	reducer: {
		testStore: testSlice
	}
})
