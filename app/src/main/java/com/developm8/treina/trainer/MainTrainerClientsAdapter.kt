package com.developm8.treina.trainer

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.developm8.treina.R
import com.developm8.treina.model.Client
import com.developm8.treina.trainer.clientdetail.TrainerClientDetailActivity
import com.google.android.material.button.MaterialButton
import com.squareup.picasso.Picasso
import de.hdodenhof.circleimageview.CircleImageView

class MainTrainerClientsAdapter(
    private val mDataset : List<Client>,
    private val layoutInflater: LayoutInflater
) : RecyclerView.Adapter<MainTrainerClientsAdapter.BaseViewHolder<*>>() {

    abstract class BaseViewHolder<T>(itemView: View, layoutInflater: LayoutInflater) : RecyclerView.ViewHolder(itemView) {
        abstract fun bind(item: T)

        class ClientViewHolder(val view: View, val layoutInflater: LayoutInflater) : BaseViewHolder<Client>(view, layoutInflater) {
            private val clientName: TextView = view.findViewById(R.id.materialTextViewClientName)
            private val clientProfileImage: CircleImageView = view.findViewById(R.id.circleImageViewProfile)
            private val materialButtonSee: MaterialButton = view.findViewById(R.id.materialButtonSee)
            override fun bind(item: Client) {
                this.clientName.text = item.name
                Picasso.get().load(item.photo).resize(50,50).centerCrop().into(this.clientProfileImage)
                materialButtonSee.setOnClickListener {
                    val i: Intent = Intent(view.context, TrainerClientDetailActivity::class.java)
                    view.context.startActivity(i)
                }
            }
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<*> {
        val view: View = LayoutInflater.from(parent.context).inflate(R.layout.item_main_trainer_clients, parent, false)
        return BaseViewHolder.ClientViewHolder(view, layoutInflater)
    }

    override fun onBindViewHolder(holder: BaseViewHolder<*>, position: Int) {
        val item = mDataset[position]
        when(holder) {
            is BaseViewHolder.ClientViewHolder -> {
                holder.bind(item)
            }
        }
    }

    override fun getItemCount(): Int {
        return mDataset.size
    }

}