import { Link } from 'react-router-dom';
import RMDBLogo from '../images/react-movie-logo.svg';
import TMDBLogo from '../images/tmdb_logo.svg';

import { Wrapper, Content, LogoImg, TMDBLogoImg } from './Header.styles';

const Header = () => (
	<Wrapper>
		<Content>
			<Link to="/">
				<LogoImg src={RMDBLogo} alt="rmbd-logo" />
			</Link>

			<TMDBLogoImg src={TMDBLogo} alt="tmbd-logo" />
		</Content>
	</Wrapper>
);

export default Header;
