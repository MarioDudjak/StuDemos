﻿using Project.Service.Common;

namespace Project.Service
{
    public class DIModule : Ninject.Modules.NinjectModule
    {
        public override void Load()
        {
            Bind<IApplyService>().To<ApplyService>();
        }
    }
}
