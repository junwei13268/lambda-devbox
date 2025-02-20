'use client';

import CodeEditor from "@/components/code-editor";
import { Resizer } from "@/components/resizer";
import { useEffect, useRef, useState } from "react";
import { ApiTestClient } from "./api-test-client";

export function BodyClient(props: { data: any }) {

  const apiTestBarRef = useRef(null);
  const [code, setCode] = useState(props.data.code);
  const [originCode, setOriginCode] = useState(props.data.code);
  const [sidebarWidth, setSidebarWidth] = useState(420);
  const [isSaving, setIsSaving] = useState(false);
  // api test
  const [request, setRequest] = useState<{ pathParam1: string, pathParam2: string, httpMethod: string, queryString: string, headers: string, body: string }>({ pathParam1: '', pathParam2: '', httpMethod: 'GET', queryString: '', headers: '', body: '' });
  const [response, setResponse] = useState<{ status: number, body: string, headers: string }>({ status: 0, body: '', headers: '' });
  const [isTesting, setIsTesting] = useState(false);
  // logs
  const [logs, setLogs] = useState<string[]>([]);

  // save code if changed
  useEffect(() => {
    if (code === originCode) return;
    const timer = setTimeout(async () => {
      setIsSaving(true);
      await fetch(`/api/code?id=${props.data.id}`, { method: 'PUT', body: JSON.stringify({ code }) });
      setOriginCode(code);
      setIsSaving(false);
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [code]);

  useEffect(() => {
    if (response.status && apiTestBarRef.current) {
      const scroller = apiTestBarRef.current as HTMLElement;
      scroller.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' });
    }
  }, [response]);

  // submit
  const submit = async () => {
    setIsTesting(true);
    setResponse({ status: 0, body: '', headers: '' });
    const method = request.httpMethod;
    const headers = request.headers.split('\n').map(header => (header.split(':'))).filter(header => !!header[0]).reduce((acc, header) => {
      acc[header[0]] = header[1];
      return acc;
    }, {} as Record<string, string>);
    try {
      const res = await fetch(`/api/lambda/${props.data.id}/param2?${request.queryString}`, ['GET', 'HEAD'].includes(request.httpMethod) ? { method, headers: { passHeaders: JSON.stringify(headers) } } : { method, headers: { passHeaders: JSON.stringify(headers) }, body: request.body });
      if (['HEAD', 'OPTIONS'].includes(request.httpMethod)) {
        const responseHeaders: Record<string, string> = {};
        res.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        setResponse({ status: res.status, headers: JSON.stringify(responseHeaders), body: 'null' });
      } else {
        const newResponse = await res.json();
        setLogs(newResponse.body.logs);
        setResponse({ ...newResponse, body: JSON.stringify(newResponse.body.body), headers: JSON.stringify(newResponse.headers) });
      }
    } catch (error) {
      console.log(error)
    }
    setIsTesting(false);
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex flex-col" style={{ width: `calc(100vw - ${sidebarWidth}px - 56px)` }}>
        {/* editor */}
        <div className="w-full h-2/3 relative">
          <CodeEditor initialValue={code} onChange={(value) => setCode(value)} />
          <div className="absolute bottom-4 right-6 h-4 z-40">
            <div className="h-full flex items-center justify-center">
              {isSaving ? <>
                <svg height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 13H15M8.4 19C5.41766 19 3 16.6044 3 13.6493C3 11.2001 4.8 8.9375 7.5 8.5C8.34694 6.48637 10.3514 5 12.6893 5C15.684 5 18.1317 7.32251 18.3 10.25C19.8893 10.9449 21 12.6503 21 14.4969C21 16.9839 18.9853 19 16.5 19L8.4 19Z" stroke="#c1c5cb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <span className="text-xs ml-1">Saving...</span>
              </>
                : <svg height="100%" width={16} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 13.2222L10.8462 15L15 11M8.4 19C5.41766 19 3 16.6044 3 13.6493C3 11.2001 4.8 8.9375 7.5 8.5C8.34694 6.48637 10.3514 5 12.6893 5C15.684 5 18.1317 7.32251 18.3 10.25C19.8893 10.9449 21 12.6503 21 14.4969C21 16.9839 18.9853 19 16.5 19L8.4 19Z" stroke="#4a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>}
            </div>
          </div>
        </div>
        {/* logs */}
        <div className="flex-1 border-t font-mono overflow-auto">
          <div className="font-bold p-4 sticky top-0 bg-background">Logs</div>
          <div className="p-4 text-sm flex flex-col mb-16 gap-1">
            {logs.map((log, index) => (
              <div key={`log-${index}`} className="flex items-center break-all whitespace-pre-wrap">{log}</div>
            ))}
          </div>
        </div>
      </div>
      {/* api test bar */}
      <div ref={apiTestBarRef} className="group border-l relative p-4 box-border overflow-auto z-10" style={{ width: sidebarWidth }}>
        <ApiTestClient isSaving={isSaving} request={request} setRequest={setRequest} response={response} isTesting={isTesting} submit={submit} />
      </div>
      <Resizer width={sidebarWidth} setWidth={setSidebarWidth} />
    </div>
  )
}