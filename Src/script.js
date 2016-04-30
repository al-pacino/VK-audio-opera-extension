function match_mp3( url )
{
	var re = /(https?:\/\/.+\.mp3)\?.*/i;
	if( re.test( url ) ) {
		return url.match( re )[1];
	}
	return null;
}

function download_mp3( url )
{
	window.open( url );
}

function add_save_buttons()
{
	var audios = document.getElementsByClassName( 'play_btn_wrap' );
	for( var ai = 0; ai < audios.length; ai++ ) {
		var play_btn_wrap = audios[ai];
		if( play_btn_wrap.getElementsByClassName( 'todua' ).length > 0 ) {
			continue;
		}
		var play_btn = play_btn_wrap.parentNode;
		if( !play_btn ) {
			continue;
		}
		var input = ( play_btn.getElementsByTagName( 'input' ) || [null] )[0];
		if( !input ) {
			continue;
		}
		var url = match_mp3( input.value );
		if( !url ) {
			continue;
		}
		var save_a = document.createElement( 'a' );
		save_a.className = 'todua';
		save_a.setAttribute( 'href', url );
		save_a.setAttribute( 'download', 'audio-' + ( ai + 1 ) );
		/*save_a.onclick = ( function( url ) {
				return function( ev ){
						download_mp3( url );
						ev.stopPropagation();
					}
			} )( url );*/
		save_a.onclick = function( ev ){ ev.stopPropagation(); };
		save_a.onmousedown = function( ev ){ ev.stopPropagation(); };
		var save_img = document.createElement( 'img' );
		save_img.src = chrome.extension.getURL( 'images/save_button.png' );
		save_a.appendChild( save_img );
		play_btn_wrap.firstChild.appendChild( save_a );
	}
}

add_save_buttons();
