import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { categoryApi } from './api/categories'
import { tuneApi } from './api/tunes'
import uiSlice from './domaine/ui/ui.slice'
import categorySlice from './domaine/category/category.slice'
import { setCategoryListener } from './domaine/category/setCategoryListener'
import { listenerMiddleware, startAppListening } from './listenerMidleware'
import tuneSlice from './domaine/tune/tune.slice'
import { setTuneListener } from './domaine/tune/setTuneListener'
import { storageApi } from './api/storage'
export const store = configureStore({
	reducer: {
		// Add the generated reducer as a specific top-level slice
		[categoryApi.reducerPath]: categoryApi.reducer,
		[tuneApi.reducerPath]: tuneApi.reducer,
		[storageApi.reducerPath]: storageApi.reducer,
		ui: uiSlice,
		category: categorySlice,
		tune: tuneSlice,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			categoryApi.middleware,
			tuneApi.middleware,
			storageApi.middleware
		).prepend(listenerMiddleware.middleware),

})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

startAppListening(setCategoryListener)
startAppListening(setTuneListener)