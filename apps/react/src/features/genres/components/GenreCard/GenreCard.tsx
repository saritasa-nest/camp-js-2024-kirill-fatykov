import { memo, FC } from 'react';
import { Genre } from '@js-camp/core/models/genre';

import styles from './GenreCard.module.css';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Props {

	/** Genre. */
	readonly genre: Genre;
}

/** Card with genre data. */
const GenreCardComponent: FC<Props> = ({ genre }: Props) => (
	<div className={styles.card}>
		<h2>{genre.name}</h2>
		<span>Id - {genre.id}</span>
	</div>
);

// eslint-disable-next-line jsdoc/require-jsdoc
export const GenreCard = memo(GenreCardComponent);
