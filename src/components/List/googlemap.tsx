import { Map, Polyline, GoogleApiWrapper, Marker, IGoogleApiOptions, GoogleApiOptionsFunc, IProvidedProps } from 'google-maps-react';
import { I_MapPoint } from '../../types';

const mapStyles = {
    width: '100%',
    height: '100%',
};
const lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 2,
};
interface AAA extends IProvidedProps {
    center: google.maps.LatLngLiteral,
    mapsPoints: I_MapPoint[]
}
export const MapContainer: React.FC<AAA> = (props) => {
    return <Map
        google={(window as any).google}
        style={mapStyles}
        zoom={4}
        streetViewControl={false}
        mapTypeControl={false}
        fullscreenControl={false}
        initialCenter={props.center}
    >
        {props.mapsPoints.map((mp, index) => {
            const key = "marker_" + mp.title
            const pos = { lat: mp.lat, lng: mp.lng }
            const labelText = index === 0 ? "START" : index === props.mapsPoints.length - 1 ? "END" : mp.title
            const fontSize = (index === 0 || index === props.mapsPoints.length - 1) ? "20px" : "12px"
            return <Marker key={key} position={pos} title={mp.title} label={{ text: labelText, fontSize, fontWeight: "900" }} />

        })}
        <Polyline
            geodesic={true}
            path={props.mapsPoints}
            options={{
                strokeColor: '#ff0096',
                strokeOpacity: 0,

                icons: [{
                    icon: lineSymbol,
                    offset: '0',
                    repeat: '10px'
                }],
            }}
        />
    </Map>
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC4O6hLMztgbK3chErxjPpR0VIHRTh-pD0'
})(MapContainer);

