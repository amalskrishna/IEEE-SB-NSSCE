import { Event } from './types';
import { csEvents } from './events/cs';
import { pesEvents } from './events/pes';
import { rasEvents } from './events/ras';
import { wieEvents } from './events/wie';
import { iasEvents } from './events/ias';
import { comsocEvents } from './events/comsoc';
import { imsEvents } from './events/ims';
import { vtsEvents } from './events/vts';
import { iesEvents } from './events/ies';
import { pelsEvents } from './events/pels';
import { edsocEvents } from './events/edsoc';
import { mttsEvents } from './events/mtts';
import { sightEvents } from './events/sight';
import { execomEvents } from './events/execom';

const unsortedEvents: Event[] = [
  ...csEvents,
  ...pesEvents,
  ...rasEvents,
  ...wieEvents,
  ...iasEvents,
  ...comsocEvents,
  ...imsEvents,
  ...vtsEvents,
  ...iesEvents,
  ...pelsEvents,
  ...edsocEvents,
  ...mttsEvents,
  ...sightEvents,
  ...execomEvents
];

export const events: Event[] = unsortedEvents.sort((a, b) => 
  new Date(b.date).getTime() - new Date(a.date).getTime()
);
