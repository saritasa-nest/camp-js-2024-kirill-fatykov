import { Routes } from '@angular/router';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./anime-table/anime-table.component').then(m => m.AnimeTableComponent),
	},
	{
		path: 'register',
		loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
	},
];
