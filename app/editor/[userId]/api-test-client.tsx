import CodeEditor from "@/components/code-editor"
import { Button } from "@/components/ui/button"
import { Input, Textarea } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { isValidJson } from "@/lib/utils"
import React from "react"

interface ApiTestClientProps {
  isSaving: boolean
  request: { pathParam1: string, pathParam2: string, httpMethod: string, queryString: string, headers: string, body: string };
  response: { status: number, body: string, headers: string };
  setRequest: React.Dispatch<React.SetStateAction<{ pathParam1: string, pathParam2: string, httpMethod: string, queryString: string, headers: string, body: string }>>
  isTesting: boolean
  submit: () => void
}

export const ApiTestClient = ({ isSaving, request, setRequest, response, isTesting, submit }: ApiTestClientProps) => {
  return (
    <>
      <div className="font-bold">TEST API</div>
      <div className="mt-4">
        <Label className="text-muted-foreground text-sm">HTTP method</Label>
        <Select id="http-method" value={request.httpMethod} onSelect={(value) => setRequest({ ...request, httpMethod: value })} options={['DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT']} />
      </div>
      <div className="mt-4">
        <Label className="text-muted-foreground text-sm">Headers</Label>
        <Textarea className="resize-y" rows={2} placeholder={`header1:value1\nheader2:value2`} value={request.headers} onChange={(e) => setRequest({ ...request, headers: e.target.value })} />
      </div>
      <div className="mt-4">
        <Label className="text-muted-foreground text-sm">Query string</Label>
        <Input placeholder="param1=value1&param2=value2" value={request.queryString} onChange={(e) => setRequest({ ...request, queryString: e.target.value })} />
      </div>
      {!['GET', 'HEAD'].includes(request.httpMethod) && <div className="mt-4">
        <Label className="text-muted-foreground text-sm">Request body</Label>
        <div className="rounded-md overflow-hidden h-40 border">
          <CodeEditor initialValue={request.body} onChange={(value) => setRequest({ ...request, body: value })} language="json" lineNumber="off" />
        </div>
      </div>}
      <div className="mt-4 flex">
        <Button onClick={submit} disabled={isSaving || isTesting || (!!request.body && !isValidJson(request.body))}>{isTesting ? <Spinner /> : 'Test'}</Button>
      </div>
      <Separator className="my-4" />
      <div className="font-bold">Results</div>
      {response.status ? <>
        <div className="mt-4">
          <Label className="text-muted-foreground text-sm">Status</Label>
          <div className="text-sm">{response.status}</div>
        </div>
        {!!response.body && <div className="mt-4">
          <Label className="text-muted-foreground text-sm">Response body</Label>
          <div className="text-sm break-all">{response.body}</div>
        </div>}
        <div className="my-4">
          <Label className="text-muted-foreground text-sm">Response headers</Label>
          <div className="text-sm break-all">{response.headers}</div>
        </div>
      </> : <></>}
      <div className="mt-16" />
    </>
  )
}