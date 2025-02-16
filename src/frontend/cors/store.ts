import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { categoryApi } from './api/categories'
import { tuneApi } from './api/getTunes'
import uiSlice from './domaine/ui/ui.slice'
import categorySlice from './domaine/category/category.slice'
import { setCategoryListener } from './domaine/category/setCategoryListener'
import { listenerMiddleware, startAppListening } from './listenerMidleware'
export const store = configureStore({
	reducer: {
		// Add the generated reducer as a specific top-level slice
		[categoryApi.reducerPath]: categoryApi.reducer,
		[tuneApi.reducerPath]: tuneApi.reducer,
		ui: uiSlice,
		category: categorySlice,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(categoryApi.middleware, tuneApi.middleware).prepend(listenerMiddleware.middleware),

})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

startAppListening(setCategoryListener)
