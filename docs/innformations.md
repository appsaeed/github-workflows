# Action infromations yml

```yml
name: Get information from github action

on: 
 push: 
  branches:
    - main

jobs:
  informations:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: echo github.action= ${{ github.action }}
      - run: echo github.action_path= ${{ github.action_path }}
      - run: echo github.action_ref= ${{ github.action_ref}}
      - run: echo github.action_repository= ${{ github.action_repository }}
      - run: echo github.action_status= ${{ github.action_status }}
      - run: echo github.actor= ${{ github.actor }}
      - run: echo github.actor_id= ${{ github.actor_id }}
      - run: echo github.api_url= ${{ github.api_url }}
      - run: echo github.base_ref= ${{ github.base_ref }}
      - run: echo github.event_name= ${{ github.event_name }}
      - run: echo github.event.after= ${{ github.event.after }}
      - run: echo github.event.base_ref= ${{ github.event.base_ref }}
      - run: echo github.event.before= ${{ github.event.before }}
      - run: echo github.event.commits= ${{ github.event.commits }}
      - run: echo github.event.compare= ${{ github.event.compare }}
      - run: echo github.event.created= ${{ github.event.created }}
      - run: echo github.event.deleted= ${{ github.event.deleted }}
      - run: echo github.event.enterprise= ${{ github.event.enterprise }}
      - run: echo github.event.forced= ${{ github.event.forced }}
      - run: echo github.event.head_commit= ${{ github.event.head_commit }}
      - run: echo github.event.installation= ${{ github.event.installation }}
      - run: echo github.event.organization= ${{ github.event.organization }}
      - run: echo github.head_ref= ${{ github.head_ref }}
      - run: echo github.job= ${{ github.job }}
      - run: echo github.job_workflow_sha= ${{ github.job_workflow_sha }}
      - run: echo github.path= ${{ github.path }}
      - run: echo github.ref= ${{ github.ref }}
      - run: echo github.ref_name= ${{ github.ref_name }}
      - run: echo github.ref_protected= ${{ github.ref_protected }}
      - run: echo github.ref_type= ${{ github.ref_type }}
      - run: echo github.repository= ${{ github.repository }}
      - run: echo github.repository_id= ${{ github.repository_id }}
      - run: echo github.repository_owner= ${{ github.repository_owner }}
      - run: echo github.repository_owner_id= ${{ github.repository_owner_id }}
      - run: echo github.repositoryUrl= ${{ github.repositoryUrl }}
      - run: echo github.retention_days= ${{ github.retention_days }}
      - run: echo github.secret_source= ${{ github.secret_source }}
      - run: echo github.server_url= ${{ github.server_url }}
      - run: echo github.sha= ${{ github.sha }}
      - run: echo github.token= ${{ github.token }}
      - run: echo github.triggering_actor= ${{ github.triggering_actor }}
      - run: echo github.workflow= ${{ github.workflow }}
      - run: echo github.workflow_ref= ${{ github.workflow_ref }}
      - run: echo github.workflow_sha= ${{ github.workflow_sha }}
      - run: echo github.workspace= ${{ github.workspace }}
```