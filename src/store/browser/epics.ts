/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as O from 'fp-ts/lib/Option';
import * as OT from 'Modules/optionTuple';
import { getActiveTab } from 'Modules/comms/browser';
import { ThunkAC } from 'Store';
import { setPageMeta } from './actions';

export const syncBrowserInfo = (): ThunkAC<Promise<void>> => async (dispatch) => {
	const tab = O.option.chain(
		await getActiveTab(),
		tab => OT.fromNullable(tab.title, tab.url),
	);

	if (O.isSome(tab)) {
		const [title, url] = tab.value;
		dispatch(setPageMeta(title, url));
	}
};

