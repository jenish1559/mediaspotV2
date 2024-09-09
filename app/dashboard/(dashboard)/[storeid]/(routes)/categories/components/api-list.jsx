import { ApiAlert } from '@/components/ui/api-alert';
import { useOrigin } from '@/hooks/use-origin';
import { useParams } from 'next/navigation'
import React from 'react'

const ApiList = ({entityName,entityIdName}) => {
    const params = useParams();
    const origin = useOrigin();

    const basrUrl = `${origin}/api/${params.storeid}`;
  return (
    <>
    <ApiAlert title="GET" variant="public" description={`${basrUrl}/${entityName}`} />
    <ApiAlert title="GET" variant="public" description={`${basrUrl}/${entityName}/${entityIdName}`} />
    <ApiAlert title="POST" variant="admin" description={`${basrUrl}/${entityName}`} />
    <ApiAlert title="PATCH" variant="admin" description={`${basrUrl}/${entityName}/${entityIdName}`} />
    <ApiAlert title="DELETE" variant="admin" description={`${basrUrl}/${entityName}/${entityIdName}`} />
    </>
  )
}

export default ApiList