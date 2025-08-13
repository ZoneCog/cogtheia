// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
// *****************************************************************************

// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';

/**
 * ```typescript
 * const disableJSDOM = enableJSDOM();
 * // actions require DOM
 * disableJSDOM();
 * ```
 */
export function enableJSDOM(): () => void {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable no-unused-expressions */

    // do nothing if running in browser
    try {
        globalThis;
    } catch (e) {
        return () => { };
    }
    // no need to enable twice
    if (typeof (globalThis as any)['_disableJSDOM'] === 'function') {
        return (globalThis as any)['_disableJSDOM'];
    }
    const dom = new JSDOM('<!doctype html><html><body></body></html>', {
        url: 'http://localhost/'
    });
    (globalThis as any)['document'] = dom.window.document;
    (globalThis as any)['window'] = dom.window;
    try {
        (globalThis as any)['navigator'] = { userAgent: 'node.js', platform: 'Mac' };

    } catch (e) {
        // node 21+ already has a navigator object
    }

    const toCleanup: string[] = [];
    Object.getOwnPropertyNames((dom.window as any)).forEach(property => {
        if (!(property in globalThis)) {
            (globalThis as any)[property] = (dom.window as any)[property];
            toCleanup.push(property);
        }
    });
    (dom.window.document as any)['queryCommandSupported'] = function (): void { };

    const disableJSDOM = (globalThis as any)['_disableJSDOM'] = () => {
        let property: string | undefined;
        while (property = toCleanup.pop()) {
            delete (globalThis as any)[property];
        }
        delete (dom.window.document as any)['queryCommandSupported'];
        delete (globalThis as any)['document'];
        delete (globalThis as any)['window'];
        delete (globalThis as any)['navigator'];
        delete (globalThis as any)['_disableJSDOM'];
    };
    return disableJSDOM;
}
